import { Card, ScrollArea, Table, Tabs } from "@mantine/core";
import { client } from "app/lib/sanity";
import React, { useEffect, useState } from "react";

import styles from "./tabs.module.scss";

interface TableData {
  constituency: string;
  candidate: string;
  pcNo: string;
  pdf: string;
}

async function getData() {
  const query = `
    *[_type == "candidates"]{
      "state": state.en,
      constituencies[] {
        "constituency": constituency.en,
        "candidate": candidate.en,
        "pcNo" : pcNo.en,
         "pdf": pdf.asset->url
      }
    }
  `;

  const data = await client.fetch(query);
  return data.reduce((acc: Record<string, TableData[]>, candidate: any) => {
    acc[candidate.state] = candidate.constituencies;
    return acc;
  }, {});
}

const TabContent: React.FC<{ tableData: TableData[] }> = ({ tableData }) => {
  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th>CONSTITUENCY</th>
          <th>CANDIDATE</th>
          <th>PC NO.</th>
          <th>PDF</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row) => (
          <tr key={`${row.constituency}-${row.pcNo}`}>
            <td>{row.constituency}</td>
            <td>{row.candidate}</td>
            <td>{row.pcNo}</td>
            <td className={styles.viewCell}>
              {" "}
              {row.pdf ? (
                <a href={row.pdf} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              ) : (
                "No PDF"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const TabsComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Nagaland");
  const [data, setData] = useState<Record<string, TableData[]>>({});

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={styles.card}
    >
      <ScrollArea className={styles.scrollArea}>
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as string)}
          classNames={{
            root: styles.tabsRoot,
            list: styles.tabsList,
            tab: styles.tab,
          }}
        >
          <Tabs.List>
            {Object.keys(data).map((state) => (
              <Tabs.Tab key={state} value={state}>
                {state}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </ScrollArea>

      <ScrollArea className={styles.tableScrollArea}>
        <TabContent tableData={data[activeTab] || []} />
      </ScrollArea>
    </Card>
  );
};

export default TabsComponent;
