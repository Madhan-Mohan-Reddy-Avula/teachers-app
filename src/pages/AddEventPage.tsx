
import { AddEvent } from "@/components/AddEvent";
import { useNavigate } from "react-router-dom";

export function AddEventPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8E4BE] via-[#84D6A7] to-[#7ED6A7] p-6">
      <div className="max-w-4xl mx-auto">
        <AddEvent onBack={handleBack} />
      </div>
    </div>
  );
}
