# Step 1: Build the React frontend
FROM node:16 AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Step 2: Set up the Django backend and copy the built React app
FROM python:3.10
ENV PYTHONUNBUFFERED=1

WORKDIR /backend
COPY gpt4_tasks/requirements.txt /backend/
RUN pip install -r requirements.txt
COPY gpt4_tasks/ .

# Copy the built React app from Step 1
COPY --from=frontend-builder /frontend/build/ /backend/staticfiles/

# Expose the default Django port
EXPOSE 8000

# Run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
