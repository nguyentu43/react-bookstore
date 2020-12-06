import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from "@chakra-ui/react";

import React from "react";

export default function ConfirmButton({ buttonText, title = 'Detele', content = 'Do you want to delete this?', closeText = 'No', acceptText = 'Yes', onAccept, ...rest }) {

    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
  
    return (
      <>
        <Button {...rest} onClick={() => setIsOpen(true)}>
          { buttonText }
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                { title }
              </AlertDialogHeader>
  
              <AlertDialogBody>
                { content }
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  { closeText }
                </Button>
                <Button colorScheme="red" onClick={onAccept} ml={3}>
                  { acceptText }
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }