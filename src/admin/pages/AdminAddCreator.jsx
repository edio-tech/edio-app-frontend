// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import { SquarePlus } from "lucide-react";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

// API imports
import creatorsAPI from "api_link/creators.js";
import UsersAPI from "api_link/users.js";
import tagsAPI from "api_link/tags.js";

// Components
import { Spinner, AddTag } from "components";
import { AdminAddUser } from "admin";

// Hooks
import useAdminNavbar from "hooks/useAdminNavbar";

// Context imports
import useLogContext from "hooks/useLogContext";

// styling
import "styles/admin/adminaddcreator.css";

// This doesnt work, stopped halfway through creating it.

const AdminAddCreator = () => {
  const { development } = useLogContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const [userOptionsLoading, setUserOptionsLoading] = useState(null);
  const [userOptionsArray, setUserOptionsArray] = useState([]);
  const [tagOptionsLoading, setTagOptionsLoading] = useState(true);
  const [tagOptionsArray, setTagOptionsArray] = useState([]);
  const [hash, setHash] = useState(location.hash);

  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const { setLeftName, setLeftAction, setTitleName, setRightName, setRightAction } = useAdminNavbar();

  useEffect(() => {
    if (hash === "") {
      setLeftName("All Creators");
      setLeftAction(() => () => navigate("/admin/all-creators"));
      setTitleName("Add Creator");
      setRightName("");
      setRightAction(null);
    }
  }, [hash]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const res = await UsersAPI.getAllCreatorAndAdminUsers(token);

        if (res.status < 200 || res.status >= 300) {
          // Check if response status is not OK (200-299)
          throw new Error(`${res.data}. Status: ${res.status}`);
        }

        const content = res.data;
        const users = content;
        console.log("users:", users);
        setUserOptionsArray(users);
      } catch (err) {
        setErrors(err.message);
        if (development) {
          console.log(err.message);
        }
      } finally {
        setUserOptionsLoading(false);
      }
    };

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

    fetchUserData();
    fetchTagData();
    setRefetch(false);
  }, [refetch]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formdata = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await creatorsAPI.addCreator(formdata);

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
      // Add logic to add the creator info to Craetor context so a page refresh is not required.
      navigate("/admin/all-creators");
    } catch (err) {
      setErrors(err.message);
      if (development) {
        console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    setHash(location.hash);
  }, [location.hash]);

  const handleAddTagClick = () => {
    setLeftName("Add Creator");
    setLeftAction(() => () => {
      setHash("");
    });
    setTitleName("Add Tag");
    setHash("#add-tag");
  };

  const handleAddUserClick = () => {
    setLeftName("Add Creator");
    setLeftAction(() => () => {
      setHash("");
    });
    setTitleName("Add User");
    setHash("#add-user");
  };

  return (
    <div className="flex-container">
      {hash === "#add-tag" && <AddTag setHash={setHash} setRefetch={setRefetch} />}
      {hash === "#add-user" && <AdminAddUser setHash={setHash} setRefetch={setRefetch} />}
      {hash === "" && (
        <>
          <div className="global-form">
            {errors && <div className="error-message">{errors}</div>}
            <Form.Root onSubmit={handleSubmit}>
              <div className="global-form-group flex-adjusted">
                <div className="input-field-with-plus-logo">
                  <Form.Field name="user_id">
                    <Form.Label>User</Form.Label>
                    {userOptionsLoading ? (
                      <Spinner />
                    ) : (
                      <Form.Control asChild>
                        <select id="user-name" required>
                          <option style={{ color: "black" }} value="">
                            Select a user
                          </option>
                          {userOptionsArray.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                      </Form.Control>
                    )}
                    <Form.Message match="valueMissing" className="error-message">
                      A user is required.
                    </Form.Message>
                  </Form.Field>
                </div>
                <button onClick={handleAddUserClick} className="global-trans-button">
                  <SquarePlus className="plus-logo" />
                </button>
              </div>

              <div className="global-form-group flex-adjusted">
                <div className="input-field-with-plus-logo">
                  <Form.Field name="tag_id">
                    <Form.Label>Tag Name</Form.Label>
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
                      Tag name is required
                    </Form.Message>
                  </Form.Field>
                </div>
                <button onClick={handleAddTagClick} className="global-trans-button">
                  <SquarePlus className="plus-logo" />
                </button>
              </div>

              <div className="global-form-group">
                <Form.Field name="chat_name">
                  <Form.Label>Nickname / Chat Name</Form.Label>
                  <Form.Control asChild>
                    <input id="nickname" type="text" required />
                  </Form.Control>
                  <Form.Message match="valueMissing" className="error-message">
                    Nickname / Chat Name is required
                  </Form.Message>
                </Form.Field>
              </div>

              <div className="global-form-group">
                <Form.Field name="currency_name">
                  <Form.Label>Currency Name</Form.Label>
                  <Form.Control asChild>
                    <input id="currency-name" type="text" required />
                  </Form.Control>
                  <Form.Message match="valueMissing" className="error-message">
                    Currency Name is required
                  </Form.Message>
                </Form.Field>
              </div>

              <div className="global-form-group">
                <Form.Field name="chat_intro">
                  <Form.Label>Chat Intro Message</Form.Label>
                  <Form.Control asChild>
                    <textarea id="chat-intro" required />
                  </Form.Control>
                  <Form.Message match="valueMissing" className="error-message">
                    Chat Intro Message is required
                  </Form.Message>
                </Form.Field>
              </div>

              <div className="global-form-group">
                <Form.Field name="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control asChild>
                    <textarea id="description" required />
                  </Form.Control>
                  <Form.Message match="valueMissing" className="error-message">
                    Creator description is required
                  </Form.Message>
                </Form.Field>
              </div>

              <div className="global-form-group">
                <Form.Field name="module_based_subscription">
                  <div className="checkbox-container">
                    <Form.Label className="checkbox-label" htmlFor="module-based-subscription">
                      Module based subscription?
                    </Form.Label>
                    <Form.Control className="checkbox-control" asChild>
                      <input type="checkbox" id="module-based-subscription" />
                    </Form.Control>
                  </div>
                </Form.Field>
              </div>

              <div className="global-form-group">
                <Form.Field name="automatically_publish">
                  <div className="checkbox-container">
                    <Form.Label className="checkbox-label" htmlFor="automatically-publish">
                      Automatically publish?
                    </Form.Label>
                    <Form.Control className="checkbox-control" asChild>
                      <input type="checkbox" id="automatically-publish" />
                    </Form.Control>
                  </div>
                </Form.Field>
              </div>

              <div className="global-flex-form-button-container">
                <Form.Submit asChild>
                  <button type="submit" className="global-form-submit-button">
                    {loading ? <BeatLoader /> : "Submit"}
                  </button>
                </Form.Submit>
              </div>
            </Form.Root>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAddCreator;
