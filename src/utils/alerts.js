import Toastify from 'toastify-js'

const typeColors = {
  error: "linear-gradient(to right, #ff5f6d, #ffc371)",
  success: "linear-gradient(to right, #00b09b, #96c93d)",
  warning: "linear-gradient(to right, #f7b733, #fc4a1a)",
  info: "linear-gradient(to right, #2193b0, #6dd5ed)",
}

const popAlert = (msg, type = "error", time = 3000) => {
    Toastify({
        text: msg,
        duration: time,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: typeColors[type] || typeColors.error,
        },
    }).showToast();
};

export { popAlert }