import Swal from 'sweetalert2'


export default function updatealert(){

   Swal.fire({
  title: 'Success!',
  text: 'Your Password was Updated.',
  icon: 'success',
  position: 'top-end',      // Places it in the top-right corner
  width: '300px',         // Reduces the size (default is 32rem)
  showConfirmButton: false, // Removes the OK button
  timer: 2000           // Optional: Automatically closes it after 3 seconds
});
}