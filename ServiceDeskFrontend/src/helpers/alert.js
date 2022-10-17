import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';

export const AlertChackra = (icon, title, message) => {
  
  const { onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        isOpen={onOpen}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
        <Alert
          status={icon}
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="400px"
        >
          <AlertIcon boxSize="80px" mr={0} />
          <AlertTitle mt={4} fontSize="lg">
            {title}
          </AlertTitle>
          <AlertDescription maxWidth="sm" mt={4}>
            {message}
          </AlertDescription>
          <Button colorScheme={'purple'} onClick={onClose} mt={4}>
            OK
          </Button>
        </Alert>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// export const AlertChackra = (icon, title, message) => {
//   <AlertDialog motionPreset="slideInBottom" isCentered>
//     <Alert
//       status={icon}
//       variant="subtle"
//       flexDirection="column"
//       alignItems="center"
//       justifyContent="center"
//       textAlign="center"
//       height="400px"
//     >
//       <AlertIcon boxSize="80px" mr={0} />
//       <AlertTitle mt={4} fontSize="lg">
//         {title}
//       </AlertTitle>
//       <AlertDescription maxWidth="sm" mt={4}>
//         {message}
//       </AlertDescription>
//       <Button colorScheme={'purple'} mt={4}>
//         OK
//       </Button>
//     </Alert>
//   </AlertDialog>;
// };

export const notification = (title, message, type, id) => {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    confirmButtonText: 'Aceptar',
    target: document.getElementById(`chakra-modal-${id}`)
    // target: document.getElementById('chakra-modal-modalOrganoAsignacion')
  });
};

export const notify = (title, message, type) => {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    confirmButtonText: 'Aceptar',
    target: document.getElementById('chakra-modal-modalHistorialUsuario')
  });
};

export const timerNotification = title => {
  let timerInterval;

  Swal.fire({
    title: title,
    html: 'Serás redireccionado en <b></b> segundos.',
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer();
        if (content) {
          const b = content.querySelector('b');
          if (b) {
            b.textContent = Swal.getTimerLeft();
          }
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
};
