const verify = {
  confirm_message: 'Confirm the domain:',
  verification_process_title: 'The verification process',
  verification_process: [
    `Any domain that is added to be scanned by SIWECOS must be verified and cross checked. Siwecos
    offers two methods for this (File, Meta Tag).`,
    `Why is verification necessary? The verification proves that you are the true owner of the domain,
    which is necessary for data protection reasons.`
  ],
  meta_tag_title: 'Meta Tag',
  meta_tag: {
    item_one: `In order to verify a domain with a meta tag, please copy the code specified by
    us into the header information of your homepage.`,
    item_two: `Download the homepage (e.g. index.html) and copy the meta tag into the head of the file.`,
    item_three: `Reload the start file to the main directory of the website and click “Verify” on the Siwecos page.`,
    item_four: `If the meta information can be found, the new domain will be accepted for the Siwecos services and saved.`
  },
  file_title: 'File',
  file: {
    item_one: `In order to verify a domain with a file, please first download the
    verification HTML that we created for you:`,
    item_two: `Afterwards, upload the created HTML file to the main directory of your website.`,
    item_three: `Finally, click “Verify”. If verification is successful,
    the new domain will be accepted for the Siwecos services and saved.`
  }
}

export default verify
