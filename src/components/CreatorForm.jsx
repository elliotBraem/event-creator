import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Flex,
  HStack,
} from "@chakra-ui/react";
import createThing from "../services/createThing";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CreatorForm = ({ setIsLoading, handleError, handleSuccess }) => {
  const [allDay, setAllDay] = useState(false);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await createThing({
      title,
      startStr: start.toISOString(),
      endStr: end ? end.toISOString() : null,
      title,
      url,
    });
    if (response.error) {
      handleError(response.error);
    } else {
      handleSuccess();
      setTitle("");
      setUrl("");
      setEnd(new Date());
      setStart(new Date());
      setAllDay(false);
    }
    setIsLoading(false);
  };

  const isSubmitDisabled = !title || !start || !end;

  return (
    <Flex flexDirection="column" alignItems="left" mt={2}>
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>URL</FormLabel>
        <Input value={url} onChange={(event) => setUrl(event.target.value)} />
      </FormControl>
      <HStack>
        <FormControl isRequired>
          <FormLabel>Start</FormLabel>
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy h:mm aa"
          />
        </FormControl>
        {!allDay && (
          <FormControl isRequired>
            <FormLabel>End</FormLabel>
            <DatePicker
              selected={end}
              onChange={(date) => setEnd(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MM/dd/yyyy h:mm aa"
            />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>All Day</FormLabel>
          <Checkbox
            isChecked={allDay}
            onChange={(event) => setAllDay(event.target.checked)}
          />
        </FormControl>
      </HStack>
      <Button onClick={handleSubmit} isDisabled={isSubmitDisabled}>
        Submit
      </Button>
    </Flex>
  );
};

export default CreatorForm;
