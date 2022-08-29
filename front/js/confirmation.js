const urlIdParam = new URL(window.location.href);
const orderId = urlIdParam.searchParams.get('orderId');

document.querySelector("#orderId").innerHTML = orderId;
