// WK Studio — comportamentos mínimos, sem excesso de JS

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.textContent = isOpen ? "Fechar" : "Menu";
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Cartões de intenção na página de contato
  const intentCards = document.querySelectorAll(".intent-card");
  const markChecked = () => {
    intentCards.forEach((card) => {
      const input = card.querySelector("input");
      card.classList.toggle("is-checked", input.checked);
    });
  };
  if (intentCards.length) {
    markChecked();
    intentCards.forEach((card) => card.addEventListener("click", markChecked));
  }

  // Formulário de contato — sem backend ainda, então abre o e-mail já preenchido.
  // Trocar por integração real (Formspree, endpoint próprio etc.) antes de publicar.
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const intent = form.querySelector('input[name="intent"]:checked')?.value || "";
      const name = form.name.value;
      const email = form.email.value;
      const message = form.message.value;

      const subject = encodeURIComponent(`[WK Studio] ${intent} — ${name}`);
      const body = encodeURIComponent(
        `Nome: ${name}\nE-mail: ${email}\nIntenção: ${intent}\n\nMensagem:\n${message}`
      );
      window.location.href = `mailto:contato@wkstudio.com.br?subject=${subject}&body=${body}`;
    });
  }
});
