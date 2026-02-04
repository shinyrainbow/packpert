"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  phone: string;
  lineId: string;
  email: string;
  currentWork: string;
  currentWorkOther: string;
  expectedIncome: string;
  pricingApproach: string;
  confirmCommission: boolean;
  confirmPricing: boolean;
}

export default function AgentApplicationForm() {
  const t = useTranslations("agentForm");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    lineId: "",
    email: "",
    currentWork: "",
    currentWorkOther: "",
    expectedIncome: "",
    pricingApproach: "",
    confirmCommission: false,
    confirmPricing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const currentWorkOptions = [
    { value: "salesOEM", label: t("currentWorkSalesOEM") },
    { value: "purchasingOEM", label: t("currentWorkPurchasingOEM") },
    { value: "brandOwner", label: t("currentWorkBrandOwner") },
    { value: "brandConsultant", label: t("currentWorkBrandConsultant") },
    { value: "other", label: t("currentWorkOther") },
  ];

  const expectedIncomeOptions = [
    { value: "lessThan10000", label: t("incomeLessThan10000") },
    { value: "10000to30000", label: t("income10000to30000") },
    { value: "moreThan30000", label: t("incomeMoreThan30000") },
  ];

  const pricingApproachOptions = [
    { value: "explainCustomer", label: t("pricingExplainCustomer") },
    { value: "consultPackpert", label: t("pricingConsultPackpert") },
    { value: "requestDiscount", label: t("pricingRequestDiscount") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/agent-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          lineId: "",
          email: "",
          currentWork: "",
          currentWorkOther: "",
          expectedIncome: "",
          pricingApproach: "",
          confirmCommission: false,
          confirmPricing: false,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.phone &&
    formData.lineId &&
    formData.email &&
    formData.currentWork &&
    (formData.currentWork !== "other" || formData.currentWorkOther) &&
    formData.expectedIncome &&
    formData.pricingApproach &&
    formData.confirmCommission &&
    formData.confirmPricing;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t("namePlaceholder")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("phone")} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={t("phonePlaceholder")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("lineId")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.lineId}
            onChange={(e) => setFormData({ ...formData, lineId: e.target.value })}
            placeholder={t("lineIdPlaceholder")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("email")} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t("emailPlaceholder")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Current Work */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("currentWorkQuestion")} <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {currentWorkOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="currentWork"
                value={option.value}
                checked={formData.currentWork === option.value}
                onChange={(e) => setFormData({ ...formData, currentWork: e.target.value, currentWorkOther: "" })}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
              />
              <span className="text-gray-700 group-hover:text-primary transition-colors">{option.label}</span>
            </label>
          ))}
        </div>
        {formData.currentWork === "other" && (
          <input
            type="text"
            required
            value={formData.currentWorkOther}
            onChange={(e) => setFormData({ ...formData, currentWorkOther: e.target.value })}
            placeholder={t("currentWorkOtherPlaceholder")}
            className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        )}
      </div>

      {/* Expected Income */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("expectedIncomeQuestion")} <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {expectedIncomeOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="expectedIncome"
                value={option.value}
                checked={formData.expectedIncome === option.value}
                onChange={(e) => setFormData({ ...formData, expectedIncome: e.target.value })}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
              />
              <span className="text-gray-700 group-hover:text-primary transition-colors">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pricing Approach */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t("pricingApproachQuestion")} <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {pricingApproachOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="pricingApproach"
                value={option.value}
                checked={formData.pricingApproach === option.value}
                onChange={(e) => setFormData({ ...formData, pricingApproach: e.target.value })}
                className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
              />
              <span className="text-gray-700 group-hover:text-primary transition-colors">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confirmations */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.confirmCommission}
            onChange={(e) => setFormData({ ...formData, confirmCommission: e.target.checked })}
            className="w-5 h-5 mt-0.5 text-primary focus:ring-primary border-gray-300 rounded shrink-0"
          />
          <span className="text-gray-700 text-sm group-hover:text-primary transition-colors">
            {t("confirmCommission")} <span className="text-red-500">*</span>
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.confirmPricing}
            onChange={(e) => setFormData({ ...formData, confirmPricing: e.target.checked })}
            className="w-5 h-5 mt-0.5 text-primary focus:ring-primary border-gray-300 rounded shrink-0"
          />
          <span className="text-gray-700 text-sm group-hover:text-primary transition-colors">
            {t("confirmPricing")} <span className="text-red-500">*</span>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
          {t("successMessage")}
        </div>
      )}
      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
          {t("errorMessage")}
        </div>
      )}
    </form>
  );
}
