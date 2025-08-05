<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'voyage_db';
$username = 'root'; // par défaut avec XAMPP
$password = '';     // mot de passe vide par défaut

$conn = new mysqli($host, $username, $password, $dbname);

// Vérifie la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Récupère les données envoyées
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Requête SQL
$sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo "Message envoyé avec succès.";
} else {
    echo "Erreur : " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
