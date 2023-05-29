import React, { FC } from "react";
import moment from "moment";
import Link from "next/link";
import { BsBuildings as CompanyIcon } from "react-icons/bs";

import Image from "@/common/components/elements/Image";

import { CareerProps } from "@/common/types/careers";

const CareerCard: FC<CareerProps> = ({
	position,
	company,
	logo,
	location,
	start_date,
	end_date,
	link,
}) => {
	const startDate = moment(start_date);
	const endDate = end_date ? moment(end_date) : moment();

	const durationYears = endDate.diff(startDate, "years");
	const durationMonths = endDate.diff(startDate, "months") % 12;

	let durationText = "";
	if (durationYears > 0) {
		durationText += `${durationYears} Year${durationYears > 1 ? "s" : ""} `;
	}
	if (durationMonths > 0 || durationYears === 0) {
		durationText += `${durationMonths} Month${durationMonths > 1 ? "s" : ""}`;
	}

	return (
		<div className="flex items-center gap-5 py-4 px-5 md:px-6 rounded-xl transition-all duration-300 bg-neutral-100 dark:bg-neutral-800">
			{logo ? (
				<Image src={logo} width={50} height={50} alt={company} />
			) : (
				<CompanyIcon size={30} />
			)}

			<div className="space-y-1">
				<h6>{position}</h6>
				<div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
					<div className="flex items-center gap-1 md:gap-2">
						<Link href={link || "#"} target="_blank">
							<span className="underline cursor-pointer hover:text-dark hover:dark:text-white">
								{company}
							</span>
						</Link>
						<span className="text-neutral-300 dark:text-neutral-700">•</span>
						<span>{location}</span>
					</div>
					<div className="flex flex-col md:text-[13px]">
						<div className="flex gap-1">
							<span>{startDate.format("MMM YYYY")}</span> -{" "}
							<span>{end_date ? endDate.format("MMM YYYY") : "Present"}</span>
						</div>
						<span className="text-neutral-500 dark:text-neutral-500">
							~ {durationText}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CareerCard;