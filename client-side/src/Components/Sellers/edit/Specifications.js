import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSpecifications } from "../../../Slices/Sellers/edit/editSpecificationsSlices";

const EditSpecificationsForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.specifications.loading);
  const error = useSelector((state) => state.specifications.error);
  const success = useSelector((state) => state.specifications.success);

  const [uniqueId, setUniqueId] = useState("");
  const [specifications, setSpecifications] = useState({ color: "", size: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateSpecifications({ uniqueId, specifications }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
        />
        <input
          type="text"
          value={specifications.color}
          onChange={(e) =>
            setSpecifications({ ...specifications, color: e.target.value })
          }
        />
        <input
          type="number"
          value={specifications.size}
          onChange={(e) =>
            setSpecifications({
              ...specifications,
              size: parseFloat(e.target.value),
            })
          }
        />
        <button type="submit" disabled={loading}>
          Update Specifications
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error occurred while updating specifications.</div>}
      {success && <div>Specifications updated successfully!</div>}
    </div>
  );
};

export default EditSpecificationsForm;
