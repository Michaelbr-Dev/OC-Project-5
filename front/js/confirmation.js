/**
 * @file Order confirmation and display ID order.
 * @author Michael Briquet <contact@michaelbr-dev.fr>
 */

const urlIdParam = new URL(window.location.href);
const orderId = urlIdParam.searchParams.get('orderId');

document.querySelector('#orderId').innerHTML = orderId;
