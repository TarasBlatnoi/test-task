import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(12, "Name must be max 12 characters")
    .regex(/^[A-Za-z]+$/, "Name must contain only letters"),
  surname: z
    .string()
    .min(2, "Surname must be at least 2 characters")
    .max(12, "Surname must be max 12 characters")
    .regex(/^[A-Za-z]+$/, "Surname must contain only letters"),
  selectedPokemon: z
    .array(z.string())
    .length(4, "You should have 4 Pokémon in your team"),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
