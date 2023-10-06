import { useRouter } from "next/router";
import { useEffect } from "react";

import { createBooking, mapBookingToMutationInput } from "@calcom/features/bookings/lib";

import Spinner from "../ui/spinner";

const createBookingUtility = async (bookingInput) => {
  const responseData = await createBooking(mapBookingToMutationInput(bookingInput));
  return responseData;
};

const CreateBooking = () => {
  const router = useRouter();
  const { bookingInputId } = router.query;
  useEffect(() => {
    const confirmBooking = async () => {
      if (bookingInputId) {
        const bookingData = JSON.parse(localStorage.getItem(bookingInputId));
        try {
          const data = await createBookingUtility(bookingData);
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
