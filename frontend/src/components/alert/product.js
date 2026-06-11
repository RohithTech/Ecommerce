import Swal from 'sweetalert2';

export default function showProductAddedAlert(productName) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Product Added!',
    text: `"${productName || 'New item'}" is now live in your store.`,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    toast: true
  });
}
