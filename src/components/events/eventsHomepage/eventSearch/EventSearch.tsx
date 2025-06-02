import { Button, Container, TextInput, Title, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconFilterOff, IconSearch } from "@tabler/icons-react";
import React from "react";

import classes from "./EventSearch.module.scss";

interface EventSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  titles: {
    mainTitle: string;
    subTitle: string;
    description: string;
  };
}

const EventSearch: React.FC<EventSearchProps> = ({
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
  titles,
}) => {
  const handleClearFilters = () => {
    setSearchTerm("");
    setDateRange([null, null]);
  };

  return (
    <Container className={classes.container} size="xl" style={{marginRight:"0 !important"}}>
      <div className={classes.content}>
        {/* <div className={classes.titleSection}>
          <Title order={1}>{titles.mainTitle}</Title>
          <Title order={2}>{titles.subTitle}</Title>
          <Text>{titles.description}</Text>
        </div> */}
        
        <div className={classes.searchSection} >
          <div className={classes.inputContainer}>
            <IconSearch className={classes.icon} size="1rem" stroke={1.5} />
            <TextInput
              placeholder="SEARCH BY TITLE"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              classNames={{
                input: classes.input,
                wrapper: classes.inputWrapper,
              }}
            />
          </div>
          <div className={classes.inputContainer}>
            <IconCalendar className={classes.icon} size="1rem" stroke={1.5} />
            <DatePickerInput
              type="range"
              placeholder="FROM - TO"
              value={dateRange}
              onChange={setDateRange}
              classNames={{
                input: classes.input,
                wrapper: classes.inputWrapper,
              }}
              valueFormat="DD/MM/YYYY"
            />
          </div>
          <Button
            onClick={handleClearFilters}
            variant="outline"
            color="gray"
            leftSection={<IconFilterOff size="1rem" stroke={1.5} />}
            className={classes.buttons}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default EventSearch;
