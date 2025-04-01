import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface CreditCardFormProps {
  userId: string;
  creditCard?: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  } | null;
  onCardUpdate?: (updatedCard: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  }) => void;
}

const CreditCardForm = ({ creditCard, onCardUpdate }: CreditCardFormProps) => {
  const [cardNumber, setCardNumber] = useState(creditCard?.cardNumber || "");
  const [cardHolder, setCardHolder] = useState(creditCard?.cardHolder || "");
  const [expiryDate, setExpiryDate] = useState(creditCard?.expiryDate || "");
  const [cvv, setCvv] = useState(creditCard?.cvv || "");

  // Call onCardUpdate whenever data changes
  useEffect(() => {
    if (onCardUpdate) {
      onCardUpdate({ cardNumber, cardHolder, expiryDate, cvv });
    }
  }, [cardNumber, cardHolder, expiryDate, cvv, onCardUpdate]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Credit Card Details</h2>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={16}
          required
        />
        <Input
          type="text"
          placeholder="Cardholder Name"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            maxLength={5}
            required
          />
          <Input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={3}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;

