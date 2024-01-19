"use client";
import React, { useEffect, useState } from "react";
// for api call
import axios from "axios";
// type check for typescript
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// form
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// text input
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const formSchema = z.object({
  emailId: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "password is required" }),
});

function Login() {
  const router = useRouter();
  // form submit function
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("/api/login", values);
    console.log(res.data.other.verify);
    if (res.data.other.verify) {
      toast.success("Login Sucessfully");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      router.refresh();
      toast.error("you are no verified check your mail");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailId: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-screen ">
      <Toaster richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <div className="shadow-md  grid grid-cols-1 p-5 rounded-md gap-x-10 gap-y-5 ">
            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="teacherabc@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxxxxx" {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="-mt-5">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
