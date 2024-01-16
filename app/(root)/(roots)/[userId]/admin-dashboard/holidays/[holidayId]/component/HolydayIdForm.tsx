"use client";
import { Classes, Holidays } from "@prisma/client";
import React, { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import ConfirmAlert from "@/components/ui/confirm-alert";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  year: z.string().min(2).max(50),
  month: z.string().min(2).max(50),
  date: z.string().min(2).max(50),
});
type Props = {
  data: Holidays | null;
};

function HollydayIdForm({ data }: Props) {
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
  const router = useRouter();
  const params = useParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data ? data.name : "",
      year: data ? data.year : "",
      month: data ? data.month : "",
      date: data ? data.date : "",
    },
  });
  const [open, setOpen] = useState(false);
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = data
        ? await axios.patch(`/api/holidays/${params.holidayId}`, values)
        : await axios.post(`/api/holidays`, values);

      if (res.data.msg) {
        toast.success(res.data.msg);
      } else toast.error(res.data);
      router.refresh();
      setTimeout(() => {}, 1000);
      setTimeout(() => {
        router.push(`/${params.userId}/admin-dashboard/holidays`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Api error");
    }
  }
  const handleAction = async () => {
    try {
      const res = await axios.delete(`/api/holidays/${params.holidayId}`);
      if (res.data.msg) toast.success(res.data.msg);
      else toast.error(res.data);
      router.refresh();
      setTimeout(() => {
        router.push(`/${params.userId}/admin-dashboard/holidays`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Api error");
    }
  };

  const item = {
    title: data ? "Update Holiday" : "Create New Holiday",
    submit: data ? "Update" : "Create",
    description: data
      ? "you can update  holiday here"
      : "you can new create new holiday here",
  };

  return (
    <div>
      <ConfirmAlert
        title="Are you sure want to delete holidays"
        description="This action cannot be undo"
        open={open}
        setOpen={setOpen}
        handleAction={handleAction}
      />
      <Toaster richColors />
      <Container className="py-10 space-y-5">
        <div className="top flex items-center justify-between">
          <Heading title={item.title} description={item.description} />
          {data && (
            <Button variant={"destructive"} onClick={() => setOpen(true)}>
              Delete Holiday
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-10">
              {" "}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Holiday Name </FormLabel>
                    <FormControl>
                      <Input placeholder="Diwali" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your holiday name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Date </FormLabel>
                    <FormControl>
                      <Input placeholder="12" {...field} type="date" />
                    </FormControl>
                    <FormDescription>manage your date.</FormDescription>
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
                          <SelectItem value={item.name} key={item.name}>
                            {item.name}
                          </SelectItem>
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
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Container>
    </div>
  );
}

export default HollydayIdForm;
