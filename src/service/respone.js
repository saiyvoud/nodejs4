export const SendSuccess = (res, message, data) => {
  return res.status(200).json({ success: true, message, data });
};
export const SendCreate = (res, message, data) => {
  return res.status(201).json({ success: true, message, data });
};

export const SendError400 = (res, message, error) => {
  return res.status(400).json({ success: false, message, data: {}, error });
};
export const SendError401 = (res, message, error) => {
  return res.status(401).json({ success: false, message, data: {}, error });
};
export const SendError404 = (res, message, error) => {
  return res.status(404).json({ success: false, message, data: {}, error });
};
export const SendError500 = (res, message, error) => {
  return res.status(500).json({ success: false, message, data: {}, error });
};
