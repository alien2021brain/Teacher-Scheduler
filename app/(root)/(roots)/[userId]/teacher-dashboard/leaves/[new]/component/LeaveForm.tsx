"use client";
import { Classes } from "@prisma/client";
import React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  date: z.string().min(1).max(50),
  month: z.string().min(1).max(50),
  year: z.string().min(1),
  reason: z.string().min(1).max(50),
});

function ClassIdForm() {
  const router = useRouter();
  const params = useParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      month: "",
      year: "",
      reason: "",
    },
  });
  const month = [
    {
      abbreviation: "Jan",
      name: "January",
    },
    {
      abbreviation: "Feb",
      name: "February",
    },
    {
      abbreviation: "Mar",
      name: "March",
    },
    {
      abbreviation: "Apr",
      name: "April",
    },
    {
      abbreviation: "May",
      name: "May",
    },
    {
      abbreviation: "Jun",
      name: "June",
    },
    {
      abbreviation: "Jul",
      name: "July",
    },
    {
      abbreviation: "Aug",
      name: "August",
    },
    {
      abbreviation: "Sep",
      name: "September",
    },
    {
      abbreviation: "Oct",
      name: "October",
    },
    {
      abbreviation: "Nov",
      name: "November",
    },
    {
      abbreviation: "Dec",
      name: "December",
    },
  ];

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(`/api/leaves`, values);

      if (res.data.msg) {
        toast.success(res.data.msg);
      } else toast.error(res.data);
      router.refresh();
      setTimeout(() => {
        router.push(`/${params.userId}/teacher-dashboard/leaves`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Api error");
    }
  }

  const item = {
    title: "Apply for leaves",
    submit: "Apply",
    description: "you can apply for leaves from here",
  };

  return (
    <div>
      <Toaster richColors />
      <Container className="py-10 space-y-5">
        <div className="top flex items-center justify-between">
          <Heading title={item.title} description={item.description} />
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Date</FormLabel>
                    <FormControl>
                      <Input placeholder="12-2-4" {...field} type="date" />
                    </FormControl>
                    <FormDescription>
                      Select Date you want leave
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* select */}
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Month</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a month to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {month.map((item) => (
                          <SelectItem value={item.name}>{item.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>You can manage month </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Year </FormLabel>
                    <FormControl>
                      <Input placeholder="2024" {...field} />
                    </FormControl>
                    <FormDescription>
                      you can manage year from here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your reson of leave"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Tell us about your reson of leave
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Container>
    </div>
  );
}

export default ClassIdForm;
