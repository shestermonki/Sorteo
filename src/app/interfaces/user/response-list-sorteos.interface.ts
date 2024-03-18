export interface ResponseListSorteos {
  _id:          string;
  name:         string;
  description:  string;
  startDate:    string;
  endDate:      string;
  participants: string[];
  // winner:       null;
  prize:        string;
  location:     string;
  tags:         string[];
}
