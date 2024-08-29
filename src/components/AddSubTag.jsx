import useLogContext from "hooks/useLogContext";
import * as Form from "@radix-ui/react-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { SquarePlus } from "lucide-react";

// API Imports
import tagsAPI from "api_link/tags.js";

// Component Imports
import { Spinner } from "components";

const AddSubTag = ({ hash, setHash, refetch, setRefetch, setLeftName, setLeftAction, setTitleName }) => {
  const { development } = useLogContext();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const [tagOptionsLoading, setTagOptionsLoading] = useState(true);
  const [tagOptionsArray, setTagOptionsArray] = useState([]);

  useEffect(() => {
    const fetchTagData = async () => {
      try {
        const res = await tagsAPI.getAllTags();

        if (res.status < 200 || res.status >= 300) {
          throw new Error(`${res.data}. Status: ${res.status}`);
        }

        const content = res.data;
        const tags_data = content.data;
        setTagOptionsArray(tags_data);
      } catch (err) {
        setErrors(err.message);
        if (development) {
          console.log(err.message);
        }
      } finally {
        setTagOptionsLoading(false);
      }
    };

    fetchTagData();
    setRefetch(false);
  }, [refetch]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formdata = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await tagsAPI.addSubTag(formdata);

      if (res.status < 200 || res.status >= 300) {
        // Check if response status is not OK (200-299)
        if (development) {
          setErrors(res.data.detail);
        } else {
          setErrors("There was an error creating the Tag.");
        }
        return;
      }

      let content = res.data;
      if (development) {
        console.log(content.detail);
      }
      setHash("");
      setRefetch(true);
    } catch (err) {
      setErrors(err.message);
      if (development) {
        console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTagClick = () => {
    setLeftName("Add Sub-Tag");
    setLeftAction(() => () => {
      setHash("#add-sub-tag");
    });
    setTitleName("Add Tag");
    setHash("#add-tag");
  };

  return (
    <>
      {hash === "#add-tag" && <AddTag setHash={setHash} setRefetch={setRefetch} />}
      {hash === "#add-sub-tag" && (
        <div className="global-form">
          {errors && <div className="error-message"> {errors}</div>}
          <Form.Root onSubmit={handleSubmit}>
            <div className="global-form-group flex-adjusted">
              <div className="input-field-with-plus-logo">
                <Form.Field name="tag_id">
                  <Form.Label>Parent Tag</Form.Label>
                  {tagOptionsLoading ? (
                    <Spinner />
                  ) : (
                    <Form.Control asChild>
                      <select id="tag-id" required>
                        <option style={{ color: "black" }} value="">
                          Select a tag
                        </option>
                        {tagOptionsArray.map((tag) => (
                          <option key={tag._id} value={tag._id}>
                            {tag.tag_name}
                          </option>
                        ))}
                      </select>
                    </Form.Control>
                  )}
                  <Form.Message match="valueMissing" className="error-message">
                    Parent Tag is required
                  </Form.Message>
                </Form.Field>
              </div>
              <button type="button" onClick={handleAddTagClick} className="global-trans-button">
                <SquarePlus className="plus-logo" />
              </button>
            </div>

            <div className="global-form-group">
              <Form.Field name="sub_tag_name">
                <Form.Label>Sub-Tag Name</Form.Label>
                <Form.Control asChild>
                  <input id="subtag-name" type="text" required />
                </Form.Control>
                <Form.Message match="valueMissing" className="error-message">
                  Sub-Tag name is required
                </Form.Message>
              </Form.Field>
            </div>

            <div className="global-form-group">
              <Form.Field name="sub_tag_description">
                <Form.Label>Sub-Tag Description (Optional)</Form.Label>
                <Form.Control asChild>
                  <input id="sub-tag-description" type="text" />
                </Form.Control>
              </Form.Field>
            </div>

            <div className="global-flex-form-button-container">
              <Form.Submit asChild>
                <button type="submit" className="global-form-submit-button">
                  {loading ? <BeatLoader /> : "Add Sub-Tag"}
                </button>
              </Form.Submit>
            </div>
          </Form.Root>
        </div>
      )}
    </>
  );
};

export default AddSubTag;
