import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Practice = () => {
  const { toast } = useToast();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Start the camera
  const startCamera = async () => {
    if (!window.isSecureContext) {
      setCameraError('Secure context required. Please use HTTPS or localhost.');
      toast({
        title: "Secure context required",
        description: "Camera access requires a secure context. Please use HTTPS or localhost.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setCameraError(null);
        toast({
          title: "Camera activated",
          description: "Your webcam is now active for sign language prediction.",
        });
        return true;
      }
    } catch (error) {
      console.error("Failed to access webcam:", error);
      let errorMessage = "Unable to access your camera. Please check permissions and ensure a webcam is connected.";
      if (error.name === "NotAllowedError") {
        errorMessage = "Camera access denied. Please allow camera access in your browser settings and try again.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "No camera found. Please ensure a webcam is connected.";
      }
      setCameraError(errorMessage);
      toast({
        title: "Camera error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };

  // Retry camera access
  const retryCameraAccess = async () => {
    setCameraError(null);
    const success = await startCamera();
    if (!success) {
      toast({
        title: "Retry failed",
        description: "Could not access the camera. Please check permissions or try refreshing the page.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndSend = async () => {
    if (!canvasRef.current || !videoRef.current) {
      toast({
        title: "Error",
        description: "Camera is not ready. Please ensure the webcam is active.",
        variant: "destructive",
      });
      return;
    }

    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');

      try {
        const response = await fetch('http://127.0.0.1:5000/predict-image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.prediction) {
          const validLabels = ['1', 'A', 'ए', 'க', 'రా'];

          if (validLabels.includes(data.prediction)) {
            setPrediction(prev => prev ? `${prev} ${data.prediction}` : data.prediction);

            toast({
              title: "Prediction successful",
              description: `Detected sign: ${data.prediction}`,
            });
          } else if (data.prediction === "No hand detected") {
            toast({
              title: "No hand detected",
              description: "Please show your hand clearly to the camera.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Invalid prediction",
              description: "Unexpected prediction received from the server.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Prediction error",
            description: data.error || "Unknown error occurred.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Request failed",
          description: `Error: ${error.message}`,
          variant: "destructive",
        });
      }
    }, 'image/jpeg');
  };

  const clearPrediction = () => {
    setPrediction('');
    toast({
      title: "Prediction cleared",
      description: "All predictions have been reset.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-signx-light-purple/30 to-white dark:from-slate-900 dark:to-slate-900 py-16">
          <div className="signx-container max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="signx-heading text-4xl font-extrabold mb-4">
              <span className="signx-gradient-text">SignX</span> <br/>
                <span className="signx-gradient-text">Live Sign Language</span> Prediction
              </h1>
              <p className="signx-text text-lg mb-8">
                Capture and predict sign language gestures in real-time using your webcam.
              </p>
            </div>
          </div>
        </section>

        <section className="signx-section py-12">
          <div className="signx-container max-w-7xl mx-auto px-6">
            <Card className="overflow-hidden max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="relative bg-slate-900 aspect-video rounded-lg border-2 border-slate-900">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover rounded-lg"
                    width="400"
                    height="300"
                  ></video>
                  <canvas
                    ref={canvasRef}
                    width="400"
                    height="300"
                    className="hidden"
                  ></canvas>

                  {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 text-white rounded-lg">
                      <Camera className="w-16 h-16 mb-4 opacity-60" />
                      <h3 className="text-xl font-semibold mb-2">Camera Off</h3>
                      <p className="text-slate-300 mb-6 text-center max-w-md">
                        Enable your camera to start predicting sign language gestures. If prompted, allow camera access in your browser.
                      </p>
                      {cameraError && (
                        <Button
                          onClick={retryCameraAccess}
                          className="bg-signx-purple hover:bg-signx-purple/90 rounded-full"
                        >
                          Retry Camera Access
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-4">
                  <Button
                    onClick={captureAndSend}
                    className="w-full bg-signx-purple hover:bg-signx-purple/90 rounded-full text-lg py-6"
                    disabled={!cameraActive}
                  >
                    <Camera className="mr-2 h-5 w-5" /> Capture & Predict
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearPrediction}
                    className="w-full rounded-full text-lg py-6"
                  >
                    Clear
                  </Button>
                </div>

                <div className="mt-6">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 min-h-[100px] border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <p className={`text-xl ${prediction.includes('Error') ? 'text-red-600' : 'text-green-600'} whitespace-pre-wrap break-words`}>
                      {prediction ? `Prediction: ${prediction}` : 'Prediction will appear here after capturing.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-slate-100 dark:bg-slate-800">
          <div className="signx-container max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="signx-heading text-3xl font-extrabold mb-4">Tips for Better Results</h2>
              <p className="signx-text max-w-3xl mx-auto">
                Follow these suggestions to improve the accuracy of sign language prediction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Good Lighting",
                  description: "Ensure your hands are well-lit and visible against the background.",
                },
                {
                  title: "Clear Hand Movements",
                  description: "Make deliberate, clear gestures and maintain proper hand positioning.",
                },
                {
                  title: "Appropriate Distance",
                  description: "Position yourself so your upper body and hands are clearly visible in the frame.",
                },
              ].map((tip, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 bg-signx-light-purple dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                      <span className="text-xl font-bold text-signx-purple dark:text-white">{index + 1}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-3">{tip.title}</h3>
                    <p className="signx-text">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Practice;
