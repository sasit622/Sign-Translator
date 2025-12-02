import joblib  # Use joblib instead of pickle
import cv2
import mediapipe as mp
import numpy as np
import pyttsx3
import time
import threading
import queue
import os

# Load the trained model
model_path = 'model.p'

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file '{model_path}' not found! Ensure the model is trained and saved correctly.")

model = joblib.load(model_path)  # Load using joblib

# Initialize webcam
cap = cv2.VideoCapture(0)  # Change to 1 if using external camera

# Initialize Mediapipe hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.5)

# Labels for detected alphabets
labels_dict = {0: '1', 1: 'A', 2: 'ए', 3: 'க', 4: 'రా'}

# Initialize variables for text and speech
recognized_text = ""
last_prediction = None  # Prevent repeating the same output
last_prediction_time = time.time()
prediction_cooldown = 1.0  # Minimum time (in seconds) between different predictions

# Initialize text-to-speech engine
engine = pyttsx3.init()
engine.setProperty('rate', 150)  # Adjust speech rate
tts_queue = queue.Queue()  # Queue for text-to-speech

# Function to process speech from the queue
def process_speech():
    while True:
        text = tts_queue.get()
        if text is None:
            break  # Stop thread when None is received
        engine.say(text)
        engine.runAndWait()

# Start speech processing thread
tts_thread = threading.Thread(target=process_speech, daemon=True)
tts_thread.start()

# Process every nth frame to reduce lag
frame_skip = 2  # Process every 2nd frame
frame_count = 0

while True:
    frame_count += 1
    ret, frame = cap.read()
    if not ret:
        continue

    # Skip frames to improve performance
    if frame_count % frame_skip != 0:
        continue

    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(frame_rgb)
    
    data_aux = []
    x_ = []
    y_ = []

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                frame, hand_landmarks, mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style()
            )

            # Extract X and Y coordinates
            for i in range(21):  # 21 hand landmarks
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y

                x_.append(x)
                y_.append(y)

            # Normalize the coordinates
            for i in range(21):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y
                data_aux.append(x - min(x_))  # Normalize X
                data_aux.append(y - min(y_))  # Normalize Y

        # Ensure correct feature count
        if len(data_aux) == 42:  
            current_time = time.time()

            # Predict only if cooldown time has passed
            if (last_prediction is None or last_prediction != data_aux) and (current_time - last_prediction_time > prediction_cooldown):
                prediction = model.predict([np.asarray(data_aux)])
                predicted_character = labels_dict[int(prediction[0])]

                # Update only if the prediction is new
                if predicted_character != recognized_text:
                    recognized_text = predicted_character
                    last_prediction = data_aux
                    last_prediction_time = current_time

                    # Add text to speech queue
                    tts_queue.put(recognized_text)

                    print("Recognized Text:", recognized_text)

            # Draw bounding box
            x1, y1 = int(min(x_) * W) - 10, int(min(y_) * H) - 10
            x2, y2 = int(max(x_) * W) + 10, int(max(y_) * H) + 10

            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 3)
            cv2.putText(frame, recognized_text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 255), 3, cv2.LINE_AA)

    else:
        recognized_text = ""
        cv2.putText(frame, "No hand detected", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 255), 3, cv2.LINE_AA)

    # Show video output
    cv2.imshow('Sign Language Detector', frame)

    # Exit if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        tts_queue.put(None)  # Stop TTS thread
        break

cap.release()
cv2.destroyAllWindows()
