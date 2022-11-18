import { useState } from "react";
import Container from "../components/Container";
import ImageUpload from "../components/ImageUpload";
import UploadContainer from "../components/UploadContainer";
import jsPDF, { AcroFormCheckBox } from "jspdf";
import SubmitButton from "../components/SubmitButton";
import Inputfield from "../components/Inputfield";
import styled from "styled-components";

export default function Home() {
  const [selectedImages, setSelectedImages] = useState(null);
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");
  const [mail, setMail] = useState("");
  const [anreise, setAnreise] = useState("");
  const [abreise, setAbreise] = useState("");
  const [gast, setGast] = useState("");

  const anschrift = [`${street}`, `${plz}`, `${city}`];
  anschrift.join(",");

  const onSelectedFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages(imagesArray);
  };

  const generatePDF = () => {
    setColor("#f6a201");
    var doc = new jsPDF("p", "px", "a4");
    var bestätigung = doc.splitTextToSize(
      "Hiermit bestätigen wir Ihnen, dass Sie die angekreuzten Positionen nach Check-Out des Gastes uns an die o.g. Adresse in Rechnung stellen dürfen.",
      530
    );
    var pageWidth = 447;
    var pageRand = 35;
    doc.addImage(
      `${selectedImages}`,
      "PNG",
      pageWidth - (130 + pageRand),
      20,
      130,
      30
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Kostenübernahmeerklärung", pageRand, 160);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("durch die Firma:", pageRand, 180);
    // doc.setFont("helvetica", "bold");
    doc.text(`${company}`, pageRand + 57, 180);
    doc.text("Rechnungsanschrift:", pageRand, 200);
    doc.setFont("helvetica", "normal");
    doc.text(`${anschrift}`, pageRand + 72, 200);
    doc.text("E-Mail Buchhaltung:", pageRand, 220);
    doc.text(`${mail}`, pageRand + 71, 220);
    doc.text(
      "Hiermit bestätigen wir die Übernahme der folgenden Kosten für die durch uns getätigte Reservierung:",
      pageRand,
      250
    );
    doc.text("Anreise:", pageRand, 270);
    doc.text(`${anreise}`, pageRand + 30, 270);
    doc.text("Abreise:", pageRand + 140, 270);
    doc.text(`${abreise}`, pageRand + 140 + 30, 270);
    doc.text("Gastname:", pageRand, 290);
    doc.text(`${gast}`, pageRand + 40, 290);
    doc.setFont("helvetica", "bold");
    doc.text("Bitte entsprechend ankreuzen:", pageRand, 320);
    doc.setFont("helvetica", "normal");
    doc.rect(pageRand + 1, 335, 5, 5, "S");
    doc.text("Übernachtung", pageRand + 15, 340);
    doc.rect(pageRand + 1, 350, 5, 5, "S");
    doc.text("Frühstück", pageRand + 15, 355);
    doc.rect(pageRand + 1, 365, 5, 5, "S");
    doc.text("Telefon", pageRand + 15, 370);
    doc.rect(pageRand + 1, 380, 5, 5, "S");
    doc.text("Tiefgarage", pageRand + 15, 385);
    doc.rect(pageRand + 1, 395, 5, 5, "S");
    doc.text("Außenstellplatz", pageRand + 15, 400);
    doc.rect(pageRand + 1, 410, 5, 5, "S");
    doc.text("Haustier", pageRand + 15, 415);
    doc.text(bestätigung, pageRand, 455);
    doc.line(pageRand,540,160,540)
    doc.line(pageRand + 150,540,310,540)
    doc.text('Ort, Datum', pageRand, 550);
    doc.setFont("helvetica", "bold");
    doc.text('Firmenstempel', pageRand + 150, 550);
    doc.setFont("helvetica", "normal");
    doc.text('+ Unterschrift', pageRand + 205, 550);
    doc.save("Kostenübernahmeerklärung.pdf");
  };

  console.log("anschrift", anschrift);

  return (
    <div>
      <Container>
        <UploadContainer>
          <img style={{ maxWidth: "8rem" }} src="logo.png" />
          <h1>Kostenübernahme PDF-Generator</h1>
          <input
            onChange={onSelectedFile}
            type="file"
            accept="image/png, image/jpeg"
          ></input>
          <ImageUpload url={selectedImages}></ImageUpload>
          <Inputfield
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="Firmenname"
          ></Inputfield>
          <Inputfield
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            placeholder="Straße"
          ></Inputfield>
          <Inputfield
            onChange={(e) => setPlz(e.target.value)}
            type="text"
            placeholder="PLZ"
          ></Inputfield>
          <Inputfield
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Ort"
          ></Inputfield>
          <Inputfield
            onChange={(e) => setMail(e.target.value)}
            type="mail"
            placeholder="E-Mail Buchhaltung"
          ></Inputfield>
          <div>
            <label>Anreise </label>
            <Inputfield
              onChange={(e) => setAnreise(e.target.value)}
              type="date"
              placeholder="Anreise"
            ></Inputfield>
          </div>
          <div>
            <label>Abreise </label>
            <Inputfield
              onChange={(e) => setAbreise(e.target.value)}
              type="date"
              placeholder="Abreise"
            ></Inputfield>
          </div>
          <Inputfield
            onChange={(e) => setGast(e.target.value)}
            type="text"
            placeholder="Name"
          ></Inputfield>
          <SubmitButton color={color} onClick={generatePDF}>
            PDF erstellen
          </SubmitButton>
        </UploadContainer>
      </Container>
    </div>
  );
}
