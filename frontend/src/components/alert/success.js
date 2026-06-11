import Swal from 'sweetalert2'

export default function Success(){
    Swal.fire({
      position:"top-end",
      title: "Your Order Success!",
      text: "Thank you for your purchase✅!",
      icon: "success"
    });
}