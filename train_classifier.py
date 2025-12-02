import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
import pickle

# Custom padding function to replace TensorFlow's pad_sequences
def pad_custom_sequences(sequences, maxlen=None, padding_value=0.0):
    if not maxlen:
        maxlen = max(len(seq) for seq in sequences)
    padded = []
    for seq in sequences:
        seq = list(seq)
        if len(seq) < maxlen:
            padded_seq = seq + [padding_value] * (maxlen - len(seq))
        else:
            padded_seq = seq[:maxlen]
        padded.append(padded_seq)
    return np.array(padded, dtype=np.float32)

# Load dataset
data_dict = pickle.load(open('./data.pickle', 'rb'))
data = data_dict['data']
labels = data_dict['labels']

# Padding all sequences
print(f"Original number of samples: {len(data)}")
max_length = max(len(item) for item in data)
data = pad_custom_sequences(data, maxlen=max_length)

# Convert labels to numpy array
labels = np.asarray(labels)

# Split dataset into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(
    data, labels, test_size=0.2, shuffle=True, stratify=labels
)

# Initialize the RandomForestClassifier
model = RandomForestClassifier()

# Define hyperparameters for GridSearchCV
param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [10, 20],
    'min_samples_split': [2, 5],
    'min_samples_leaf': [1, 2]
}

# Perform hyperparameter tuning using GridSearchCV
grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    verbose=2
)

# Fit the model with the training data
grid_search.fit(x_train, y_train)

# Get the best model from the grid search
best_model = grid_search.best_estimator_

# Evaluate the best model on the test set
y_predict = best_model.predict(x_test)
accuracy = accuracy_score(y_test, y_predict)
print(f'Accuracy: {accuracy * 100:.2f}% of samples were classified correctly!')

# Print the classification report
print("Classification Report:")
print(classification_report(y_test, y_predict))

# Save the best model to disk using joblib
joblib.dump(best_model, 'model.p')
print("Model saved successfully as 'model.p'!")
