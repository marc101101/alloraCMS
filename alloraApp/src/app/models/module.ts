export class Data {
  home_headline: string;
  home_subtitle: string;
  spenden_up_title: string;
  spenden_up_text: string;
  spenden_up_sepa_iban: string;
  spenden_up_sepa_bank: string;
  spenden_sub_title: string;
  ebay: Array<EbayElement>;
}

export class EbayElement {
  title: string;
  price: string;
  status: string;
  url: string;
  img_url: string;
}

export class InfoObject {
  name: string;
  version: string;
  description: string;
  author: string;
  data: Data;
  last_update: number;
}
