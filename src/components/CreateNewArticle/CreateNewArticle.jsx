import React, { useState, useEffect } from "react";
import "./CreateNewArticle.scss";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/apiServise";
import InfoWindow from "../InfoWindow/InfoWindow";
import { Button, Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function CreateNewArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const isEdit = urlParams.get("title") !== null;
  const [onInfo, setOnInfo] = useState(false);
  const navigate = useNavigate();
  const { TextArea } = Input;

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  });

  const onFinishCreate = async (article) => {
    const body = {
      article,
    };
    api
      .createArticle(body, JSON.parse(localStorage.getItem("token")).token)
      .then((res) => {
        navigate(`/article/${res.article.slug}`);
      });
  };

  const onFinishEdit = async (article) => {
    const body = {
      article,
    };
    api
      .editArticle(
        urlParams.get("slug").trim(),
        JSON.parse(localStorage.getItem("token")).token,
        body
      )
      .then((res) => {
        if (res.article) {
          navigate(`/article/${urlParams.get("slug").trim()}`);
        } else throw new Error("Не удалось");
      });
  };

  return (
    <div className="wrapperForm">
      {onInfo ? (
        <div>
          <InfoWindow text="Статья успешно создана" />
        </div>
      ) : (
        <div>
          <h3>{isEdit ? "Edit article" : "Create new Article"}</h3>
          <Form
            name="dynamic_form_item"
            onFinish={isEdit ? onFinishEdit : onFinishCreate}
          >
            <Form.Item
              initialValue={
                isEdit ? urlParams.get("title").trim() : "aaaadssadsd"
              }
              style={{
                width: "100%",
              }}
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Не может быть пустым",
                },
                {
                  min: 4,
                  message: "не менее 4 символов",
                },
                {
                  max: 12,
                  message: "Не более 12 символов",
                },
              ]}
              name="title"
              label="Название статьи"
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={
                isEdit
                  ? urlParams.get("description").trim()
                  : "aaaadssadsdddddddddddddd"
              }
              name="description"
              label="Краткое описание"
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Не может быть пустым",
                },
                {
                  min: 8,
                  message: "не менее 8 символов",
                },
                {
                  max: 30,
                  message: "Не более 30 символов",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={
                isEdit
                  ? urlParams.get("body").trim()
                  : "aaaadssadddddddddddddddddddddddddddddddddddddddddddddsd"
              }
              // noStyle
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  required: true,
                  message: "Не может быть пустым",
                },
                {
                  min: 20,
                  message: "не менее 20",
                },
              ]}
              name="body"
              label="Полная статья"
            >
              <TextArea />
            </Form.Item>

            <div className="tags">
              <div>
                <Form.List name="tagList">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item key={field.key}>
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "Добавьте тэг или удалите данное поле",
                              },
                            ]}
                          >
                            <Input placeholder="введите тэг" />
                          </Form.Item>

                          {fields.length > 0 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{
                            width: "100%",
                          }}
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
