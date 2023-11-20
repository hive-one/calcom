import { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";

import { getLayout } from "@calcom/features/settings/layouts/SettingsLayout";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import {
  Button,
  Label,
  Meta,
  showToast,
  SkeletonButton,
  SkeletonContainer,
  SkeletonText,
  Input,
} from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";
import EmptyState from "@components/edit-profile/Account/EmptyState";

const SkeletonLoader = ({ title, description }) => {
  return (
    <SkeletonContainer>
      <Meta title={title} description={description} />
      <div className="mb-8 mt-6 space-y-6">
        <SkeletonText className="h-8 w-full" />
        <SkeletonText className="h-8 w-full" />
        <SkeletonText className="h-8 w-full" />
        <SkeletonText className="h-8 w-full" />

        <SkeletonButton className="mr-6 h-8 w-20 rounded-md p-5" />
      </div>
    </SkeletonContainer>
  );
};

const BooksSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [data, setData] = useState(user?.books || []);
  const addBookMutation = trpc.viewer.addBook.useMutation();
  const removeBookMutation = trpc.viewer.removeBook.useMutation();

  useEffect(() => {
    setData(user?.books);
  }, [user?.books]);

  const onSave = (e) => {
    e.preventDefault();
    data?.map((book) => {
      const bookData = {
        ...book,
        updatedAt: new Date(),
      };

      console.log("book", book);

      if (book?.createdAt) {
        removeBookMutation.mutate({ isbn: book.isbn });
        addBookMutation.mutate(bookData);
      } else if (book?.isbn) {
        addBookMutation.mutate(bookData);
      }
    });

    showToast("Changes saved", "success");
  };

  const addBook = () => {
    const newBook = {
      isbn: "",
      title: "",
      url: "",
      description: "",
      coverImage: "",
      updatedAt: new Date(),
    };
    setData((prev) => (prev?.length ? [...prev, newBook] : [newBook]));
  };

  const removeBook = ({ index, isbn }) => {
    if (isbn) {
      removeBookMutation.mutate({ isbn });
    }
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSave}>
      <Meta title="Appearances" description="Add links to podcasts where you have appeared" />
      {!data || (data?.length === 0 && <EmptyState label="Add links to podcasts where you have appeared" />)}
      <div className="space-y-4 divide-y">
        {data?.length > 0 &&
          data?.map((book, i) => (
            <div key={i} className="relative space-y-4 pt-4">
              <div className="col-span-2">
                <Label>ISBN</Label>
                <Input
                  required
                  autoFocus
                  label="ISBN"
                  placeholder="Enter book's ISBN e.g 9780471696483"
                  value={book.isbn}
                  onChange={(e) => {
                    const newBook = data?.length ? [...data] : [];
                    newBook[i].isbn = e.target.value;
                    setData(newBook);
                  }}
                />
              </div>
              <div className="col-span-full flex items-center justify-end">
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => removeBook({ index: i, isbn: book.isbn })}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addBook} color="secondary" type="button" className="mb-3 mt-2">
            Add book
          </Button>
        </div>
      </div>

      <Button color="primary" type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

BooksSettings.getLayout = getLayout;
BooksSettings.PageWrapper = PageWrapper;

export default BooksSettings;
