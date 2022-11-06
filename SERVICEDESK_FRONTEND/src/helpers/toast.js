import { createStandaloneToast } from '@chakra-ui/toast'
const { ToastContainer, toast } = createStandaloneToast();

export const ToastChakra = (title, description, status, duration, position) => {

    const isDark = window.localStorage.getItem('chakra-ui-color-mode') === 'dark';

    return (
        <ToastContainer>
            {toast({
                title: title,
                description: description,
                status: status,
                duration: duration,
                isClosable: true,
                variant: isDark === true ? 'solid' : 'left-accent',
                position: position ? position : 'bottom-right',
            })}
        </ToastContainer>
    )
}

