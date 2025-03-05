import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Label from "../../components/form/Label";
import { useState } from "react";
import api from "../../services/api"
import Alert from "../../components/ui/alert/Alert"
import Button from "../../components/ui/button/Button";

export default function StockForm() {
    interface StockInput {
        company: string;
        ticker: string;
        file: File | null;
    }

    const [input, setInput] = useState<StockInput>({ company: "", ticker: "", file: null });

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        console.log('Set Input')
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Using optional chaining
        if (file) {
            setInput(prev => ({ ...prev, file }));
        }
        console.log('Set File')
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted');

        const formData = new FormData();
        formData.append("org_name", input.company);
        formData.append("org_ticker", input.ticker);

        if (input.file) {
            formData.append("file", input.file);
        } else {
            console.error("No file selected");
            return;
        }

        try {
            const response = await api.post("/save_stock", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Success:", response.data);
            alert("Stock added successfully");
        } catch (err) {
            console.error("Error:", err);
            setError("Stock save failed. Please try again.");
        }
    };

    return (
        <div>
            <PageMeta
                title="Add Stocks"
                description="This is add stocks page to add new stocks information in database"
            />
            <PageBreadcrumb pageTitle="Add Stocks" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <Label>Company Name</Label>
                        <Input type="text" name="company" value={input.company} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Ticker</Label>
                        <Input type="text" name="ticker" value={input.ticker} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Logo</Label>
                        <FileInput onChange={handleFileChange} />
                    </div>
                    <div>
                        <Button className="w-full" size="sm">
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
