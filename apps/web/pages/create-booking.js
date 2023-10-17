import { useRouter } from "next/router";
import { useEffect } from "react";

import { createBooking, mapBookingToMutationInput } from "@calcom/features/bookings/lib";
import { post } from "@calcom/lib/fetch-wrapper";

import Spinner from "../ui/spinner";

const createBookingUtility = async (bookingInput) => {
  const responseData = await createBooking(mapBookingToMutationInput(bookingInput));
  return responseData;
};

const createSuccesfulPayment = async (customerId, bookingId, sessionId) => {
  const response = await post("/api/stripe/transaction", {
    customerId,
    bookingId,
    sessionId,
  });
  return response;
};

const CreateBooking = () => {
  const router = useRouter();
  const { bookingInputId, customerId, session_id } = router.query;
  const sessionId = session_id;
  useEffect(() => {
    const confirmBooking = async () => {
      if (bookingInputId) {
        const bookingData = JSON.parse(localStorage.getItem(bookingInputId));
        try {
          const data = await createBookingUtility(bookingData);
          await createSuccesfulPayment(customerId, data.id, sessionId);
          console.log("Booking created:", data);
          router.push(`/booking/${data.uid}`);
        } catch (error) {
          console.error("Error creating booking:", error);
        }
      }
    };

    confirmBooking();
  }, [bookingInputId]);

  return (
    <main className="flex h-screen items-center justify-center">
      <Spinner label="Confirming your booking..." />
    </main>
  );
};

export default CreateBooking;
