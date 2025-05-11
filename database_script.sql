-- ================================
--  Database Schema for Traffic App
-- ================================
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    role VARCHAR(50)
);
CREATE TABLE Location (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT
);
CREATE TABLE VoiceCommand (
    command_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    command_text TEXT,
    timestamp DATETIME,
    intent VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
CREATE TABLE Route (
    route_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    origin_location_id INT,
    destination_location_id INT,
    estimated_time TIME,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (origin_location_id) REFERENCES Location(location_id),
    FOREIGN KEY (destination_location_id) REFERENCES Location(location_id)
);
CREATE TABLE TrafficIncident (
    incident_id INT PRIMARY KEY AUTO_INCREMENT,
    reported_by INT,
    location_id INT,
    incident_type VARCHAR(50),
    severity VARCHAR(50),
    timestamp DATETIME,
    description TEXT,
    FOREIGN KEY (reported_by) REFERENCES User(user_id),
    FOREIGN KEY (location_id) REFERENCES Location(location_id)
);
CREATE TABLE Alert (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    message TEXT,
    alert_type VARCHAR(50),
    created_at DATETIME,
    related_incident_id INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (related_incident_id) REFERENCES TrafficIncident(incident_id)
);