import { z, ZodError } from "zod";

export const FormSchema = z.object({
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
export type FormData = z.infer<typeof FormSchema>;
