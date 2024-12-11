import React, { useState } from "react";
import { Rate, Input, Button, message } from "antd";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import productsApi from "../../hooks/useProductsApi";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái gửi phản hồi
  const { id,orderId } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    console.log(rating, comment);
    if (rating === 0 || !comment.trim()) {
      message.error("Please provide a rating and comment!");
      return;
    }

    setLoading(true);
    try {
      const response = await productsApi.feedBack(id,orderId, { rating, comment });
      if (response && response.status === 200) {
        message.success("Feedback submitted successfully!");
        navigate(`/detailOrder/${orderId}`);
      } else {
        message.error("Failed to submit feedback.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Feedback Form
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Let us know your thoughts!
        </p>

        <div className="flex flex-col items-center mb-4">
          <label className="text-lg font-medium mb-2 text-gray-700">
            Rate us:
          </label>
          <Rate
            value={rating}
            onChange={(value) => setRating(value)}
            className="text-yellow-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="feedback"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Your Feedback:
          </label>
          <Input.TextArea
            id="feedback"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback here..."
            className="border border-gray-300 rounded-md"
          />
        </div>

        <Button
          type="primary"
          block
          onClick={handleSubmit}
          loading={loading} // Hiển thị trạng thái chờ
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Submit Feedback
        </Button>
       <NavLink to={`/detailOrder/${orderId}`} className="block text-center text-blue-500 mt-4">Back</NavLink>
      </div>
    </div>
  );
}
