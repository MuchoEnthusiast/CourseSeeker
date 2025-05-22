export default function Attachment({ attachment }) {
  return (
    <div className="d-flex align-items-center me-3 mb-2">
      <a href="/">
        <i className="bi bi-paperclip fs-3"></i>
        <span className="text-truncate fs-5">{attachment.name}</span>
      </a>
    </div>
  );
}
