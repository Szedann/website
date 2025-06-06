import type { Submission, User } from "../lib/types.d.tsx";
import { getLink } from "../lib/helpers.tsx";
import CopyButton, {
  CopyPing,
  CreditsGeneration,
} from "../islands/CopyButton.tsx";

export type SubmissionProps = {
  submission: Submission;
  users?: User[];
  key?: number;
  className?: string;
  devtools?: boolean;
};

const defaultProps = {
  users: undefined,
  key: undefined,
  className: "",
};

export function Submission(props: SubmissionProps) {
  props = { ...defaultProps, ...props };
  return (
    <div
      class={`shadow-(--shadow-mf-card) rounded-2xl bg-mf-card overflow-hidden text-[unset] clickable ${props.className}`}
    >
      <a href={getLink(props.submission)} target="_blank">
        <div class="w-full bg-mf-unknown h-40 overflow-hidden z-[5]">
          {props.submission.images && props.submission.images.screenshot && (
            <img
              draggable={false}
              class="w-full h-40 object-cover"
              src={props.submission.images.screenshot}
              alt={`Gallery image for ${props.submission.name}`}
            />
          )}
          {props.submission.images && !props.submission.images.screenshot &&
            props.submission.images.icon && (
            <img
              draggable={false}
              class="w-full rotate-45 scale-[300%] opacity-95 pixelated h-40 object-cover"
              src={props.submission.images.icon}
              alt={`Icon for ${props.submission.name}`}
            />
          )}
          {!props.submission.images &&
            (
              <div
                class="w-full h-40 object-cover"
                style={`background-color: var(--event-${
                  props.submission.event?.replace(".", "-")
                }-coloured)`}
              >
              </div>
            )}
        </div>
      </a>
      <div class="p-4 pt-3 self-center">
        {props.submission.images && props.submission.images.icon && (
          <a href={getLink(props.submission)} target="_blank">
            <div
              style={{ marginTop: props.users ? "-4rem" : "-5rem" }}
              class="w-fit h-fit object-contain rounded-2xl border-mf-card border-4 border-solid bg-mf-unknown overflow-hidden z-10 absolute"
            >
              <img
                draggable={false}
                class="w-24 h-24 pixelated"
                src={props.submission.images.icon}
                alt={`Icon for ${props.submission.name}`}
              />
            </div>
          </a>
        )}
        <div
          class={props.submission.images && props.submission.images.icon
            ? "ml-[7.25rem]"
            : ""}
        >
          <div className="flex flex-row">
            <div class="basis-full">
              <a
                href={getLink(props.submission)}
                target="_blank"
                style="text-decoration:none"
              >
                <h3 class="m-0 text-mf-heading inline">
                  {props.submission.name}
                </h3>
              </a>
            </div>
            {props.submission.source
              ? (
                <div class="justify-self-end">
                  <a href={props.submission.source}>[source]</a>
                </div>
              )
              : ""}
          </div>
          {props.users &&
            props.submission.authors.map((author, index) => {
              const user = props.users!.find((u) => u.id === author);
              return user
                ? (
                  <a
                    key={`${props.key ?? "submission"}-${index}`}
                    href={`/user/${user.id}`}
                  >
                    {user.name}
                  </a>
                )
                : author;
            }).map((userElement, index) => {
              let join = "";
              if (index === props.submission.authors.length - 1) {
                if (props.submission.authors.length > 2) {
                  join = ", and ";
                } else if (props.submission.authors.length === 2) {
                  join = " and ";
                }
              } else if (index > 0) {
                join = ", ";
              }
              return (
                <span key={`${props.key ?? "submission"}-${index}`}>
                  <span>{join}</span>
                  {userElement}
                </span>
              );
            })}
        </div>
        <p className="m-0 mt-2 text-mf-heading">
          {props.submission.description}
        </p>
        {props.devtools && (
          <>
            <hr class="mt-2" />
            <div class="flex flex-row gap-2 items-center flex-wrap">
              {props.users &&
                (
                  <>
                    <CreditsGeneration
                      name={props.submission.name}
                      authors={props.submission.authors}
                      users={props.users}
                    />
                    <CopyPing
                      authors={props.submission.authors}
                      users={props.users}
                    />
                  </>
                )}
              <CopyButton content={props.submission.id}>Copy ID</CopyButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
