
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const OrderStatusStepper = ({ status }) => {

    const steps = [
        'Ordered',
        'Preparing',
        'Shipping/Idle',
        'Delivered',
    ];

    let statusStep;

    if (status === 'Ordered') {
        statusStep = 0;
    }
    else if (status === 'Preparing') {
        statusStep = 1;
    }
    else if (status === 'Shipping' || status === 'Idle') {
        statusStep = 2;
    }
    else if (status === 'Delivered') {
        statusStep = 4;
    }



    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={statusStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default OrderStatusStepper;
