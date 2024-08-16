import React, { useState } from "react";
import { z, ZodError } from "zod";

const FormSchema = z.object({
  fullName: z
    .string({
      required_error: "名前を入力してください",
      invalid_type_error: "入力が正しくないようです",
    })
    .min(2, { message: "2文字以上入力してください" }),
  age: z
    .number({
      required_error: "年齢を入力してください",
      invalid_type_error: "半角数字で入力してください",
    })
    .min(1, { message: "1以上を入力してください" })
    .int({ message: "年齢は正数で入力してください" }),
  gender: z.enum(["female", "male", "other"], {
    required_error: "性別を選択してください",
  }),
  birthday: z
    .string({ required_error: "生年月日を入力してください" })
    .pipe(z.coerce.date()),
  url: z.string().url({ message: "有効なURLを入力してください" }).optional(),
  spouse: z.number({
    required_error: "選択してください",
    invalid_type_error: "入力形式が正しくありません",
  }),
  comment: z
    .string()
    .min(10, { message: "コメントは10文字以上で入力してください" })
    .max(30, { message: "コメントは30文字以内で入力してください" })
    .optional(),
  agree: z.coerce.boolean().refine((val) => val === true, {
    message: "利用規約に同意する必要があります",
  }),
  emails: z
    .object({
      email: z
        .string({
          required_error: "メールアドレスを入力してください",
        })
        .email({ message: "有効なメールアドレスを入力してください" }),
      confirmEmail: z
        .string({
          required_error: "確認用メールアドレスを入力してください",
        })
        .email({ message: "有効なメールアドレスを入力してください" }),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: "メールアドレスが一致しません",
      path: ["confirmEmail"], // エラーをconfirmEmailフィールドに関連付けそこにエラーメッセージを表示する
    }),
});
type FormData = z.infer<typeof FormSchema>;

const ZodForm = () => {
  const [formData, setFormData] = useState<FormData | {}>({
    spouse: 1,
    agree: true,
    emails: {},
  });

  const [errors, setErrors] = useState<z.ZodFormattedError<FormData> | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, name, value, type } = e.target;
    const fieldName = id || name;

    if (type === "email") {
      setFormData((prev: FormData) => ({
        ...prev,
        emails: {
          ...prev.emails,
          [fieldName]: value,
        },
      }));
    } else if (type === "checkbox") {
      const _checkbox = e.target as HTMLInputElement;
      const _isChecked = _checkbox.checked;
      setFormData((prev) => ({ ...prev, [fieldName]: _isChecked }));
    } else if (type === "") {
      setFormData((prev) => ({ ...prev, [fieldName]: undefined }));
    } else if (/^[0-9]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [fieldName]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    try {
      FormSchema.parse(formData);
      console.log(formData);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.format());
        setErrors(error.format());
      }
    }
  };
  return (
    <main>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">full name</label>
          <div>
            <input id="fullName" type="text" onChange={handleChange} />
            {errors?.fullName?._errors && (
              <span>{errors.fullName._errors[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="age">age</label>
          <div>
            <input id="age" type="text" onChange={handleChange} />
            {errors?.age?._errors && <span>{errors.age._errors[0]}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="gender">gender</label>
          <div>
            <select id="gender" onChange={handleChange}>
              <option value="">choose one</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
            {errors?.gender?._errors && <span>{errors.gender._errors[0]}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="birthday">birthday</label>
          <div>
            <input id="birthday" type="date" onChange={handleChange} />
            {errors?.birthday?._errors && (
              <span>{errors.birthday._errors[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="email">email</label>
          <div>
            <input id="email" type="email" onChange={handleChange} />
            {errors?.emails?.email?._errors && (
              <span>{errors.emails.email._errors[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="confirmEmail">email confirm</label>
          <div>
            <input id="confirmEmail" type="email" onChange={handleChange} />
            {errors?.emails?.confirmEmail?._errors && (
              <span>{errors.emails.confirmEmail._errors[0]}</span>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <div>
            <input id="url" type="text" onChange={handleChange} />
            {errors?.url?._errors && <span>{errors.url._errors[0]}</span>}
          </div>
        </div>
        <div>
          <label>配偶者</label>
          <div>
            <label>
              <input
                name="spouse"
                type="radio"
                value="1"
                defaultChecked
                onChange={handleChange}
              />
              yes
            </label>
            <label>
              <input
                name="spouse"
                type="radio"
                value="0"
                onChange={handleChange}
              />
              no
            </label>
            {errors?.spouse?._errors && <span>{errors.spouse._errors[0]}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <div>
            <textarea id="comment" onChange={handleChange}></textarea>
            {errors?.comment?._errors && (
              <span>{errors.comment._errors[0]}</span>
            )}
          </div>
        </div>
        <div>
          <div>
            <label>
              <input
                id="agree"
                type="checkbox"
                defaultChecked
                onChange={handleChange}
              />
              <span>利用規約に同意する</span>
            </label>
            {errors?.agree?._errors && <span>{errors.agree._errors[0]}</span>}
          </div>
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </main>
  );
};
export default ZodForm;
