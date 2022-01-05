import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errs, setErrs] = useState(null);

  const doRequest = async () => {
    try {
      setErrs(null);
      const res = await axios[method](url, body);
      
      onSuccess(res.data)

      return res.data;
    } catch (e) {
      setErrs(
        <div className="alert alert-danger">
          <h4>Ooopss...</h4>
          <ul className="my-o">
            {e.response.data.errors.map((er) => (
              <li key={er.message}>{er.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errs };
};
