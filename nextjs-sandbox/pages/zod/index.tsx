import useZodForm from "@/libs/hooks/useZodForm";
import React from "react";

const ZodForm = () => {
  const { errors, handleChange, handleSubmit } = useZodForm();

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
