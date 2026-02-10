"use strict";

// SECCIÓN DE QUERY-SELECTOR
// Éstos son los elementos que nos traemos de la página HTML y usamos en el código

const designHide = document.querySelector(".js_designHide");
const fillHide = document.querySelector(".js_fillHide");
const shareHide = document.querySelector(".js_shareHide");

const colorArticle = document.querySelector(".js_colorArticle");
const fillArticle = document.querySelector(".js_fillArticle");
const shareArticle = document.querySelector(".js_shareArticle");

// QUERY SELECTOR - Formulario
const form = document.querySelector(".js_profileForm");
const nameInput = document.querySelector(".js_nameInput");
const jobInput = document.querySelector(".js_jobInput");
const photoInput = document.querySelector(".js_photoInput");
const emailInput = document.querySelector(".js_emailInput");
const phoneInput = document.querySelector(".js_phoneInput");
const linkedinInput = document.querySelector(".js_linkedIn");
const githubInput = document.querySelector(".js_gitHub");

// QUERY SELECTOR - Preview
const card = document.querySelector(".js_cardPreview"); // la tarjeta de preview que va a ir cambiando
const previewName = document.querySelector(".preview .nombre");
const paletteInputs = document.querySelectorAll("input[name='palette']");
const previewJob = document.querySelector(".preview .rol");
const previewPhoto = document.querySelector(".preview .profile-img");
const previewPhone = document.querySelector(".preview .icons a:nth-child(1)");
const previewEmail = document.querySelector(".preview .icons a:nth-child(2)");
const previewLinkedin = document.querySelector(
  ".preview .icons a:nth-child(3)"
);
const shareSuccessBox = document.querySelector(".js_shareSuccessBox");
const shareLink = document.querySelector(".js_shareLink");
const shareInTwitterLink = document.querySelector(".js_shareInTwitterLink");
const shareFailBox = document.querySelector(".js_shareFailBox");
const previewGithub = document.querySelector(".preview .icons a:nth-child(4)");
const shareBtn = document.querySelector(".js_shareBtn");

// QUERY SELECTOR - Botón Reset
const resetButton = document.querySelector(".js_resetBtn");

shareBtn.addEventListener("click", (ev) => {
  ev.preventDefault();

  const objectToSend = {
    field1: userData.palette,
    field2: nameInput.value,
    field3: jobInput.value,
    field4: phoneInput.value,
    field5: emailInput.value,
    field6: linkedinInput.value,
    field7: githubInput.value,
    photo: userData.photo,
  };

  fetch("https://dev.adalab.es/api/info/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(objectToSend),
  })
    .then((res) => res.json())
    .then((dataResponse) => {
      if (dataResponse.success === true) {
        shareSuccessBox.classList.remove("collapsed");
        shareLink.innerHTML = `https://dev.adalab.es/api/info/${dataResponse.infoID}`;
        shareLink.href = `https://dev.adalab.es/api/info/${dataResponse.infoID}`;
        shareInTwitterLink.href = `https://dev.adalab.es/api/info/${dataResponse.infoID}`;
      } else {
        shareFailBox.classList.remove("collapsed", "hidden");
        shareFailBox.classList.add("active");
        shareFailBox.classList.remove("shake");
        setTimeout(() => {
          shareFailBox.classList.add("shake");
        }, 10);
      }
    });
});

// SECCIÓN DE DATOS
// Aquí van los arrays y las variables que contantan datos de la aplicación

// Objeto para almacenar los datos del usuario
let userData = {
  name: "",
  job: "",
  photo: "images/tech-girl-profile-photo-example.jpg",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  palette: "",
};

// SECCIÓN DE FUNCIONES
// Estos son funciones:
//   - con código auxiliar
//   - con código que usaremos en los eventos
//   - para pintar (render) en la página.

// Función para actualizar la preview
function updatePreview() {
  // Actualizar nombre
  if (previewName) {
    if (userData.name) {
      previewName.textContent = userData.name;
    } else {
      previewName.textContent = "Nombre Apellido";
    }
  }

  // Actualizar puesto
  if (previewJob) {
    if (userData.job) {
      previewJob.textContent = userData.job;
    } else {
      previewJob.textContent = "Front-end developer";
    }
  }

  // Actualizar foto
  if (previewPhoto && userData.photo) {
    previewPhoto.src = userData.photo;
  }

  // Actualizar email
  if (previewEmail) {
    if (userData.email) {
      previewEmail.href = `mailto:${userData.email}`;
    } else {
      previewEmail.href = "#";
    }
  }

  // Actualizar teléfono
  if (previewPhone) {
    if (userData.phone) {
      previewPhone.href = `tel:${userData.phone}`;
    } else {
      previewPhone.href = "#";
    }
  }

  // Actualizar LinkedIn
  if (previewLinkedin) {
    if (userData.linkedin) {
      previewLinkedin.href = userData.linkedin;
    } else {
      previewLinkedin.href = "#";
    }
  }

  // Actualizar GitHub
  if (previewGithub) {
    if (userData.github) {
      previewGithub.href = userData.github;
    } else {
      previewGithub.href = "#";
    }
  }
}

// Función para cambiar la paleta de colores
function updatePalette() {
  if (!card) return;

  // Remover todas las clases de paleta anteriores
  card.classList.remove("palette-1", "palette-2", "palette-3");

  // Aplicar la nueva paleta
  card.classList.add(`palette-${userData.palette}`);
}

// Función para leer archivos de imagen
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userData.photo = e.target.result;
      updatePreview();
    };
    reader.readAsDataURL(file);
  }
}

// Función para resetear el formulario y la preview
function resetForm() {
  userData = {
    name: "",
    job: "",
    photo: "images/tech-girl-profile-photo-example.jpg",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    palette: "1",
  };

  // Limpiar los inputs del formulario
  if (nameInput) nameInput.value = "";
  if (jobInput) jobInput.value = "";
  if (photoInput) photoInput.value = "";
  if (emailInput) emailInput.value = "";
  if (phoneInput) phoneInput.value = "";
  if (linkedinInput) linkedinInput.value = "";
  if (githubInput) githubInput.value = "";

  // Resetear paleta a 1 (por defecto)
  if (paletteInputs && paletteInputs[0]) {
    paletteInputs[0].checked = true;
  }

  // Actualizar la preview
  updatePreview();
  updatePalette();
}

// SECCIÓN DE EVENTOS
// Estos son los eventos a los que reacciona la página
// Los más comunes son: click (en botones, enlaces), input (en ídem) y submit (en form)

// Flechas (acordeón)
designHide.addEventListener("click", (ev) => {
  //hemos ocultado la primera seccion

  shareArticle.classList.add("collapsed");
  fillArticle.classList.add("collapsed");
  colorArticle.classList.remove("collapsed");
});

fillHide.addEventListener("click", (ev) => {
  //hemos ocultado la primera seccion
  colorArticle.classList.add("collapsed");
  shareArticle.classList.add("collapsed");
  fillArticle.classList.remove("collapsed");
});

shareHide.addEventListener("click", (ev) => {
  //hemos ocultado la primera seccion
  fillArticle.classList.add("collapsed");
  colorArticle.classList.add("collapsed");
  shareArticle.classList.remove("collapsed");
});
// Formulario (actualización en tiempo real)

if (nameInput) {
  nameInput.addEventListener("keyup", (ev) => {
    userData.name = ev.target.value;
    updatePreview();
  });
}

if (jobInput) {
  jobInput.addEventListener("keyup", (ev) => {
    userData.job = ev.target.value;
    updatePreview();
  });
}

if (photoInput) {
  photoInput.addEventListener("change", handlePhotoUpload);
}

if (emailInput) {
  emailInput.addEventListener("keyup", (ev) => {
    userData.email = ev.target.value;
    updatePreview();
  });
}

if (phoneInput) {
  phoneInput.addEventListener("keyup", (ev) => {
    userData.phone = ev.target.value;
    updatePreview();
  });
}

if (linkedinInput) {
  linkedinInput.addEventListener("keyup", (ev) => {
    userData.linkedin = ev.target.value;
    updatePreview();
  });
}

if (githubInput) {
  githubInput.addEventListener("keyup", (ev) => {
    userData.github = ev.target.value;
    updatePreview();
  });
}

// Cambio de paleta
paletteInputs.forEach((input) => {
  input.addEventListener("change", (ev) => {
    userData.palette = ev.target.value;
    updatePalette();
  });
});

// Botón Reset
if (resetButton) {
  resetButton.addEventListener("click", resetForm);
}

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
// Este código se ejecutará cuando se carga la página
// Lo más común es:
//   - Pedir datos al servidor
//   - Pintar (render) elementos en la página
// Inicializar la preview
updatePreview();
updatePalette();
