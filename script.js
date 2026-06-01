const WHATSAPP_NUMBER = "5521997227164";

const form = document.querySelector("#lead-form");
const statusMessage = document.querySelector("#form-status");
const header = document.querySelector(".site-header");
const whatsappInput = document.querySelector("#whatsapp-input");
const revealItems = document.querySelectorAll("[data-reveal]");

document.body.classList.add("has-reveal");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const onlyDigits = (value) => value.replace(/\D/g, "");

const formatWhatsapp = (value) => {
  const digits = onlyDigits(value).slice(0, 11);
  const ddd = digits.slice(0, 2);
  const number = digits.slice(2);

  if (digits.length <= 2) {
    return ddd ? `(${ddd}` : "";
  }

  return `(${ddd}) ${number}`;
};

const validateWhatsapp = () => {
  const isValid = onlyDigits(whatsappInput.value).length === 11;
  whatsappInput.setCustomValidity(isValid ? "" : "Digite um WhatsApp no formato (21) 997227164.");
  return isValid;
};

whatsappInput.addEventListener("input", () => {
  whatsappInput.value = formatWhatsapp(whatsappInput.value);
  whatsappInput.setCustomValidity("");
  statusMessage.textContent = "";
});

whatsappInput.addEventListener("blur", validateWhatsapp);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateWhatsapp()) {
    statusMessage.textContent = "Confira o WhatsApp. Use o formato (21) 997227164.";
    whatsappInput.reportValidity();
    whatsappInput.focus();
    return;
  }

  const data = new FormData(form);
  const lead = Object.fromEntries(data.entries());
  const message = [
    "Olá, Lililog.",
    "",
    "Tenho interesse em uma proposta de entregadores dedicados.",
    "",
    `Nome: ${lead.nome}`,
    `Empresa: ${lead.empresa}`,
    `WhatsApp: ${lead.telefone}`,
    `Cidade: ${lead.cidade}`,
    `Tipo de negócio: ${lead.tipo}`,
    `Volume aproximado: ${lead.volume}`,
    `Necessidade: ${lead.mensagem || "Não informado"}`,
  ].join("\n");

  statusMessage.textContent = "Abrindo WhatsApp com as informações preenchidas.";

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
