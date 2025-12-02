import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
import pickle

# Load dataset
data_dict = pickle.load(open('./data.pickle', 'rb'))
data = np.asarray(data_dict['data'])
labels = np.asarray(data_dict['labels'])

# Split dataset
x_train, x_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, shuffle=True, stratify=labels)

# Initialize the model
model = RandomForestClassifier()

# Hyperparameter tuning using GridSearchCV
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5, scoring='accuracy', n_jobs=-1, verbose=2)
grid_search.fit(x_train, y_train)

# Best model from grid search
best_model = grid_search.best_estimator_

# Evaluate the best model
y_predict = best_model.predict(x_test)
score = accuracy_score(y_test, y_predict)
print(f'Accuracy: {score * 100:.2f}% of samples were classified correctly!')

# Print additional evaluation metrics
print("Classification Report:")
print(classification_report(y_test, y_predict))

# Save the best model
joblib.dump(best_model, 'model.p')
print("Model saved successfully as 'model.p'!")
