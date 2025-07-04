
import React, { PropsWithChildren } from 'react';
import { Box } from 'ink';

interface BorderProps extends PropsWithChildren {
    color?: string;
}

const Border: React.FC<BorderProps> = ({ children, color }) => {
    return (
        <Box
            borderStyle="round"
            borderColor={color}
            flexDirection="column"
            padding={1}
        >
            {children}
        </Box>
    );
};

export default Border;
