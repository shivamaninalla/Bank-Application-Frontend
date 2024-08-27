import { ActivateCustomer, DeactivateCustomer } from '../../services/AdminServices';
import { getAllCustomers } from '../../services/AdminServices';
export const sanitizeData = (data, keysToBeIncluded, setCustomers) => {
    const keyMapping = {
        customer_id: "Customer ID",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        active: "Status",
    };
    const handleAction = async (customerId, isActive) => {
        try {
            if (isActive) {
                await DeactivateCustomer(customerId);
            } else {
                await ActivateCustomer(customerId);
            }
            const updatedData = await getAllCustomers();
            if (updatedData && updatedData.content) {
                const sanitizedData = sanitizeData(updatedData, [
                    "customer_id",
                    "firstName",
                    "lastName",
                    "email",
                    "active"
                ], setCustomers);
                setCustomers(sanitizedData);
            } else {
                setCustomers([]);
            }
        } catch (error) {
            console.error("Error handling action:", error);
        }
    };

    const sanitizedContent = data.content.map(customer => {
        const sanitizedCustomer = {};
        keysToBeIncluded.forEach(key => {
            if (key === "active") {
                sanitizedCustomer[keyMapping[key]] = customer[key] ? "Active" : "Inactive";
            } else if (customer[key] !== undefined) {
                sanitizedCustomer[keyMapping[key]] = customer[key];
            }
        });

        sanitizedCustomer['Action'] = (
            <button
                className="button"
                onClick={() => handleAction(customer.customer_id, customer.active)}
            >
                {customer.active ? 'Deactivate' : 'Activate'}
            </button>
        );

        return sanitizedCustomer;
    });

    return {
        ...data,
        content: sanitizedContent,
    };
};
export const sanitizeTransactionData = (data) => {
    const sanitizedContent = data.content.map((transaction) => {
      const sanitizedTransaction = {
        id: transaction.id || 0,
        senderAccount: transaction.senderAccount?.accountNumber || "N/A",
        receiverAccount: transaction.receiverAccount?.accountNumber || "N/A",
        amount: transaction.amount || 0,
        transactionDate: transaction.transactionDate || "N/A",
        // Add other fields as necessary
      };
      return sanitizedTransaction;
    });
  
    return {
      ...data,
      content: sanitizedContent,
    };
  };
  