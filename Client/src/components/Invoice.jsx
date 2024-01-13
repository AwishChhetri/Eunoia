// Invoice.jsx
import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Invoice = ({ invoiceData }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" color="black" width="auto" p={4}>
      <Text fontSize="xl" mb={4}>
        Invoice
      </Text>
      <Text>Service Name: {invoiceData.serviceName}</Text>
      <Text>Company Name: {invoiceData.companyName}</Text>
      <Text>Amount: {invoiceData.amount}</Text>
      {/* Add other invoice details */}
    </Box>
  );
};


